import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { Badge } from "@/components/ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const stats = companiesData[0].stats;

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

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        className="cursor-move transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        onClick={() => setExpandedCard(expandedCard === index ? null : index)}
      >
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{stat.title}</span>
            </div>
            <Badge variant="outline" className={getStatusColor(stat.value)}>
              Good
            </Badge>
          </div>
          
          <div className="mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{stat.value}</span>
              {stat.unit && (
                <span className="text-sm text-muted-foreground">
                  {stat.unit}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </div>

          {expandedCard === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
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