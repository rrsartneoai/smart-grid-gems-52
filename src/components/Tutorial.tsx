import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const tutorialSteps = [
  {
    title: "Witaj w Panelu Monitorowania",
    description: "Poznaj podstawowe funkcje systemu monitorowania sieci energetycznej.",
  },
  {
    title: "Nawigacja",
    description: "Użyj menu bocznego, aby przełączać się między firmami. Główne funkcje dostępne są w zakładkach na górze ekranu.",
  },
  {
    title: "Asystent AI",
    description: "Asystent AI pomoże Ci w analizie danych i odpowie na Twoje pytania. Możesz go wywołać w dowolnym momencie.",
  },
  {
    title: "Skróty klawiszowe",
    description: "Naciśnij '?' aby zobaczyć listę dostępnych skrótów klawiszowych. Ctrl+K otwiera wyszukiwarkę.",
  },
];

export function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      localStorage.setItem("hasSeenTutorial", "true");
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tutorialSteps[currentStep].title}</DialogTitle>
          <DialogDescription className="mt-2">
            {tutorialSteps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between mt-6">
          <Button variant="ghost" onClick={handleSkip}>
            Pomiń
          </Button>
          <Button onClick={handleNext}>
            {currentStep === tutorialSteps.length - 1 ? "Zakończ" : "Dalej"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}