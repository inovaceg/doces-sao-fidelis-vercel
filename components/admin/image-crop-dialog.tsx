"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RotateCw, ZoomIn, ZoomOut } from "lucide-react"

interface ImageCropDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageUrl: string
  onCropComplete: (croppedImageBlob: Blob) => void
  aspectRatio?: number // Adicionado: proporção de aspecto para o canvas de corte
}

export function ImageCropDialog({ open, onOpenChange, imageUrl, onCropComplete, aspectRatio }: ImageCropDialogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (imageUrl) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        setImage(img)
        setZoom(100)
        setRotation(0)
        setPosition({ x: 0, y: 0 })
      }
      img.src = imageUrl
    }
  }, [imageUrl])

  const drawImage = useCallback(() => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get the actual *displayed* dimensions of the canvas element
    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;

    // Internal resolution of the canvas for output
    const outputWidth = 1920; // Target width for desktop banner
    const outputHeight = aspectRatio ? outputWidth / aspectRatio : outputWidth;

    // Set the actual pixel dimensions of the canvas for drawing
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, outputWidth, outputHeight);

    ctx.save();
    // Calculate the center of the internal canvas
    const centerX = outputWidth / 2;
    const centerY = outputHeight / 2;

    // Scale factor from *display* pixels (where position.x/y come from) to *internal* canvas pixels
    const scaleFactorX = outputWidth / displayWidth;
    const scaleFactorY = outputHeight / displayHeight;

    ctx.translate(
      centerX + position.x * scaleFactorX,
      centerY + position.y * scaleFactorY
    );
    ctx.rotate((rotation * Math.PI) / 180);

    const zoomScale = zoom / 100;
    const scaledImageWidth = image.width * zoomScale;
    const scaledImageHeight = image.height * zoomScale;

    ctx.drawImage(image, -scaledImageWidth / 2, -scaledImageHeight / 2, scaledImageWidth, scaledImageHeight);
    ctx.restore();
  }, [image, zoom, rotation, position, aspectRatio])

  useEffect(() => {
    if (image && canvasRef.current) {
      drawImage()
    }
  }, [image, zoom, rotation, position, drawImage])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    // Calculate drag start relative to the canvas's current display position
    const rect = e.currentTarget.getBoundingClientRect();
    setDragStart({ x: e.clientX - rect.left - position.x, y: e.clientY - rect.top - position.y });
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left - dragStart.x,
      y: e.clientY - rect.top - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleCrop = () => {
    if (!canvasRef.current) return

    canvasRef.current.toBlob(
      (blob) => {
        if (blob) {
          onCropComplete(blob)
          onOpenChange(false)
        }
      },
      "image/jpeg",
      0.95,
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-4xl flex flex-col h-[90vh]"> {/* Make dialog responsive, flex-col, and set height */}
        <DialogHeader>
          <DialogTitle>Ajustar Imagem</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-4 py-4 overflow-y-auto"> {/* Main content area, takes remaining space, allows scrolling */}
          <div className="flex justify-center bg-gray-100 rounded-lg p-2 sm:p-4 flex-1 min-h-0"> {/* Canvas container, flex-1 to take space */}
            {/* Canvas fills its parent, object-contain for image */}
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-move border border-gray-300 rounded object-contain"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
          </div>

          <div className="space-y-3"> {/* Controls section, reduced vertical spacing */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ZoomOut className="size-4 text-gray-600" />
                <span className="text-sm text-gray-600 min-w-12">Zoom:</span>
              </div>
              <Slider
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
                min={10}
                max={300}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 min-w-12 text-right">{zoom}%</span>
              <ZoomIn className="size-4 text-gray-600" />
            </div>

            <div className="flex items-center gap-4 flex-wrap"> {/* Added flex-wrap for better mobile layout */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="gap-2"
              >
                <RotateCw className="size-4" />
                Rotacionar 90°
              </Button>
              <span className="text-sm text-gray-600 flex-1 text-right sm:text-left">Arraste a imagem para reposicionar</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleCrop} className="bg-[#ff8800] hover:bg-[#e67700]">
            Aplicar e Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}