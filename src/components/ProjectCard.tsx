import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar,
  MapPin,
  Users,
  Eye,
  AlertTriangle
} from "lucide-react";

interface ProjectCardProps {
  id: string;
  name: string;
  location: string;
  progress: number;
  status: 'on-track' | 'delayed' | 'ahead';
  lastUpdate: string;
  teamSize: number;
  imageUrl: string;
  totalImages: number;
  alerts?: number;
}

export const ProjectCard = ({ 
  name, 
  location, 
  progress, 
  status, 
  lastUpdate, 
  teamSize, 
  imageUrl,
  totalImages,
  alerts = 0
}: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-success text-success-foreground';
      case 'delayed': return 'bg-destructive text-destructive-foreground';
      case 'ahead': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-track': return 'On Track';
      case 'delayed': return 'Delayed';
      case 'ahead': return 'Ahead of Schedule';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-gradient-card rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 overflow-hidden group">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Status Badge */}
        <Badge className={`absolute top-3 left-3 ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </Badge>

        {/* Alerts Badge */}
        {alerts > 0 && (
          <Badge className="absolute top-3 right-3 bg-warning text-warning-foreground">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {alerts}
          </Badge>
        )}

        {/* Image Count */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
          <Eye className="w-3 h-3" />
          <span>{totalImages}</span>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{teamSize} team members</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{lastUpdate}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button variant="default" size="sm" className="flex-1">
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};