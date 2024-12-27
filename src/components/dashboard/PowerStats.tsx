import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { Badge } from "@/components/ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronRight } from "lucide-react";

const SortableCard = ({ stat, index, expandedCard, setExpandedCard }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: stat.title });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusColor = (value: string | number) => {
    if (typeof value === "string") return "bg-green-500";
    if (value > 80) return "bg-green-500";
    if (value > 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getProgressValue = (value: string | number) => {
    if (typeof value === "string") return 100;
    return value;
  };

  const isExpanded = expandedCard === index;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        className={`cursor-move transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800 ${
          isExpanded ? 'ring-2 ring-primary' : ''
        }`}
        onClick={() => setExpandedCard(isExpanded ? null : index)}
      >
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{stat.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getStatusColor(stat.value)}>
                Good
              </Badge>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              {stat.unit && (
                <span className="text-sm text-muted-foreground">
                  {stat.unit}
                </span>
              )}
            </div>
            <Progress 
              value={getProgressValue(stat.value)} 
              className="h-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {stat.description}
            </p>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 pt-4 border-t space-y-2"
              >
                {stat.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {detail.label}
                    </span>
                    <span className="font-medium">{detail.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export const PowerStats = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  return (
    <>
      {selectedCompany?.stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="col-span-1"
        >
          <SortableCard
            stat={stat}
            index={index}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        </motion.div>
      ))}
    </>
  );
};