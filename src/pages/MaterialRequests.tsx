import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Calendar,
  Truck,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MaterialRequest {
  id: string;
  itemName: string;
  category: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
  supplier: string;
  projectName: string;
  requestDate: string;
  neededBy: string;
  status: 'pending' | 'approved' | 'ordered' | 'delivered';
  priority: 'low' | 'medium' | 'high';
  description?: string;
}

const MaterialRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MaterialRequest[]>([
    {
      id: "1",
      itemName: "Steel Rebar #4",
      category: "Structural Steel",
      quantity: 2500,
      unit: "lbs",
      estimatedCost: 3250,
      supplier: "MetalWorks Supply Co.",
      projectName: "Skyline Tower Complex",
      requestDate: "2024-12-15",
      neededBy: "2024-12-22",
      status: "pending",
      priority: "high",
      description: "High-grade steel rebar for foundation reinforcement"
    },
    {
      id: "2",
      itemName: "Concrete Mix (3000 PSI)",
      category: "Concrete",
      quantity: 50,
      unit: "cubic yards",
      estimatedCost: 8500,
      supplier: "Ready Mix Concrete Co.",
      projectName: "Metro Business Center",
      requestDate: "2024-12-14",
      neededBy: "2024-12-20",
      status: "approved",
      priority: "high",
      description: "Ready-mix concrete for second floor pour"
    },
    {
      id: "3",
      itemName: "Electrical Conduit",
      category: "Electrical",
      quantity: 500,
      unit: "ft",
      estimatedCost: 750,
      supplier: "ElectroMax Supply",
      projectName: "Residential Plaza",
      requestDate: "2024-12-13",
      neededBy: "2024-12-25",
      status: "ordered",
      priority: "medium"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const materialCategories = [
    "Structural Steel", "Concrete", "Electrical", "Plumbing", 
    "HVAC", "Roofing", "Insulation", "Drywall", "Flooring", "Windows", "Doors"
  ];

  const suppliers = [
    "MetalWorks Supply Co.", "Ready Mix Concrete Co.", "ElectroMax Supply",
    "PlumbPro Materials", "HVAC Solutions Inc.", "BuildRight Supply"
  ];

  const projects = [
    "Skyline Tower Complex", "Metro Business Center", "Residential Plaza"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'approved': return 'bg-primary text-primary-foreground';
      case 'ordered': return 'bg-accent text-accent-foreground';
      case 'delivered': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-muted';
      default: return 'border-l-muted';
    }
  };

  const handleCreateRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newRequest: MaterialRequest = {
      id: (requests.length + 1).toString(),
      itemName: formData.get('itemName') as string,
      category: formData.get('category') as string,
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit') as string,
      estimatedCost: Number(formData.get('estimatedCost')),
      supplier: formData.get('supplier') as string,
      projectName: formData.get('projectName') as string,
      requestDate: new Date().toISOString().split('T')[0],
      neededBy: formData.get('neededBy') as string,
      status: 'pending',
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
      description: formData.get('description') as string
    };

    setRequests([...requests, newRequest]);
    setIsDialogOpen(false);
    
    toast({
      title: "Material Request Created",
      description: `Request for ${newRequest.itemName} has been submitted for approval.`,
    });
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCost = filteredRequests.reduce((sum, request) => sum + request.estimatedCost, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="contractor" />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Material Requests</h1>
            <p className="text-muted-foreground">
              Manage material requests and coordinate with suppliers
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="interactive-button">
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Material Request</DialogTitle>
                <DialogDescription>
                  Submit a new material request for project approval
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateRequest} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemName">Item Name *</Label>
                    <Input id="itemName" name="itemName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {materialCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input id="quantity" name="quantity" type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input id="unit" name="unit" placeholder="e.g., lbs, ft, pcs" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedCost">Est. Cost ($)</Label>
                    <Input id="estimatedCost" name="estimatedCost" type="number" step="0.01" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Preferred Supplier</Label>
                    <Select name="supplier">
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map(supplier => (
                          <SelectItem key={supplier} value={supplier}>
                            {supplier}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project *</Label>
                    <Select name="projectName" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project} value={project}>
                            {project}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="neededBy">Needed By *</Label>
                    <Input id="neededBy" name="neededBy" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select name="priority" defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Additional details about the material request..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="interactive-button">
                    Submit Request
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold">{requests.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">
                    {requests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-success">
                    {requests.filter(r => r.status === 'approved' || r.status === 'ordered').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search materials or projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="ordered">Ordered</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Material Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className={`border-l-4 ${getPriorityColor(request.priority)} hover-lift`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{request.itemName}</h3>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {request.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {request.projectName} • {request.category}
                    </p>
                    {request.description && (
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">${request.estimatedCost.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.quantity} {request.unit}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Needed by: {new Date(request.neededBy).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{request.supplier}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredRequests.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No material requests found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria"
                    : "Create your first material request to get started"
                  }
                </p>
                {!searchTerm && statusFilter === "all" && (
                  <Button onClick={() => setIsDialogOpen(true)} className="interactive-button">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Request
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default MaterialRequests;