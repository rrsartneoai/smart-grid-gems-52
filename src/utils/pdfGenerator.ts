import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Company } from '@/types/company';

export const generatePDF = (company: Company | undefined) => {
  if (!company) return;

  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text(`Raport - ${company.name}`, 20, 20);
  
  // Add energy data table
  doc.setFontSize(16);
  doc.text('Dane energetyczne', 20, 40);
  
  const energyTableData = company.energyData.map(data => [
    data.name,
    data.consumption.toString(),
    data.production.toString(),
    data.efficiency.toString()
  ]);

  autoTable(doc, {
    head: [['Okres', 'Zużycie', 'Produkcja', 'Wydajność']],
    body: energyTableData,
    startY: 45
  });

  // Add statistics
  const currentY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(16);
  doc.text('Statystyki', 20, currentY);

  const statsData = company.stats.map(stat => [
    stat.title,
    `${stat.value}${stat.unit || ''}`
  ]);

  autoTable(doc, {
    head: [['Wskaźnik', 'Wartość']],
    body: statsData,
    startY: currentY + 5
  });

  // Save the PDF
  doc.save(`raport-${company.name.toLowerCase()}.pdf`);
};