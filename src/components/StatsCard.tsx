import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral' | 'pending';
  icon: LucideIcon;
  description?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  description 
}: StatsCardProps) => {
  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getChangeSymbol = (type: string) => {
    switch (type) {
      case 'positive': return '+';
      case 'negative': return '-';
      default: return '';
    }
  };

  return (
    <div className="bg-gradient-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
            {getChangeSymbol(changeType)}{change}
          </span>
        </div>
      </div>
    </div>
  );
};