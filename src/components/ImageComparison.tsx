import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Download,
  Maximize2,
  RotateCcw,
  ZoomIn,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

interface ComparisonImage {
  id: string;
  url: string;
  date: string;
  label: string;
  description?: string;
}

interface ImageComparisonProps {
  beforeImage: ComparisonImage;
  afterImage: ComparisonImage;
  title: string;
}

export const ImageComparison = ({ beforeImage, afterImage, title }: ImageComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="bg-gradient-card rounded-xl shadow-medium border border-border/50">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{beforeImage.date}</span>
                <ArrowRight className="w-3 h-3" />
                <span>{afterImage.date}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Comparison Container */}
      <div className="p-6">
        <div 
          className="relative w-full h-96 overflow-hidden rounded-lg cursor-col-resize"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Before Image */}
          <div className="absolute inset-0">
            <img
              src={beforeImage.url}
              alt={beforeImage.label}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground">
              {beforeImage.label}
            </Badge>
          </div>

          {/* After Image with Clip */}
          <div 
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={afterImage.url}
              alt={afterImage.label}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
              {afterImage.label}
            </Badge>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-strong cursor-col-resize z-10"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-strong flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <ArrowLeft className="w-2 h-2 text-primary-foreground absolute -left-1" />
                <ArrowRight className="w-2 h-2 text-primary-foreground absolute -right-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Image Details */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-1">{beforeImage.label}</p>
            <p className="text-xs text-muted-foreground">{beforeImage.description}</p>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-1">{afterImage.label}</p>
            <p className="text-xs text-muted-foreground">{afterImage.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};