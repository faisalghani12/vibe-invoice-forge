import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Professional template styles
const professionalStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottom: 2,
    borderBottomColor: '#6366F1',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  companyInfo: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
});

// Creative template styles
const creativeStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FAFAFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    backgroundColor: '#8B5CF6',
    padding: 20,
    marginTop: -30,
    marginLeft: -30,
    marginRight: -30,
    borderRadius: 0,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  companyInfo: {
    fontSize: 10,
    color: '#F3F4F6',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 10,
  },
});

// Minimalist template styles
const minimalistStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 60,
    paddingBottom: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  companyInfo: {
    fontSize: 9,
    color: '#666666',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#000000',
    marginBottom: 5,
    letterSpacing: 2,
  },
});

// Tech template styles
const techStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#0F172A',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottom: 1,
    borderBottomColor: '#00D9FF',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00D9FF',
  },
  companyInfo: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

// Consulting template styles
const consultingStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 35,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 45,
    borderBottom: 3,
    borderBottomColor: '#1E3A8A',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  companyInfo: {
    fontSize: 10,
    color: '#475569',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10,
  },
});

// E-commerce template styles
const ecommerceStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottom: 2,
    borderBottomColor: '#059669',
    paddingBottom: 20,
    backgroundColor: '#F0FDF4',
    padding: 20,
    marginTop: -30,
    marginLeft: -30,
    marginRight: -30,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  companyInfo: {
    fontSize: 10,
    color: '#065F46',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 10,
  },
});

// Medical template styles
const medicalStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 35,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottom: 2,
    borderBottomColor: '#2563EB',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  companyInfo: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 10,
  },
});

// Legal template styles
const legalStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Times-Roman',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 45,
    borderBottom: 3,
    borderBottomColor: '#1E3A8A',
    paddingBottom: 25,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  companyInfo: {
    fontSize: 10,
    color: '#374151',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 15,
  },
});

// Fitness template styles
const fitnessStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottom: 3,
    borderBottomColor: '#EA580C',
    paddingBottom: 20,
    backgroundColor: '#FFF7ED',
    padding: 20,
    marginTop: -30,
    marginLeft: -30,
    marginRight: -30,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#EA580C',
  },
  companyInfo: {
    fontSize: 10,
    color: '#9A3412',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 10,
  },
});

// Restaurant template styles
const restaurantStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FEF7F0',
    padding: 35,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottom: 2,
    borderBottomColor: '#92400E',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#92400E',
  },
  companyInfo: {
    fontSize: 10,
    color: '#78350F',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 10,
  },
});

// Real Estate template styles
const realestateStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 35,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottom: 2,
    borderBottomColor: '#16A34A',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  companyInfo: {
    fontSize: 10,
    color: '#4B5563',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#15803D',
    marginBottom: 10,
  },
});

// Photography template styles
const photographyStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#1F2937',
    padding: 35,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    borderBottom: 1,
    borderBottomColor: '#FFFFFF',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  companyInfo: {
    fontSize: 10,
    color: '#D1D5DB',
    textAlign: 'right',
  },
  invoiceTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

// Common styles for all templates (shared components)
const getCommonStyles = (primaryColor: string, backgroundColor: string = '#FFFFFF', textColor: string = '#1F2937') => StyleSheet.create({
  invoiceNumber: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: textColor,
    marginBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textColor,
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    color: '#6B7280',
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderBottom: 1,
    borderBottomColor: '#D1D5DB',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    color: textColor,
  },
  tableCellHeader: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    color: textColor,
  },
  tableCellRight: {
    flex: 1,
    fontSize: 10,
    color: textColor,
    textAlign: 'right',
  },
  total: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 12,
    color: textColor,
  },
  totalValue: {
    fontSize: 12,
    color: textColor,
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTop: 2,
    borderTopColor: primaryColor,
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textColor,
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: primaryColor,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
    borderTop: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
});

// Template style mapping
const getTemplateStyles = (templateId: string) => {
  const styleMap: any = {
    professional: { 
      main: professionalStyles, 
      common: getCommonStyles('#6366F1'), 
      colors: { primary: '#6366F1', bg: '#FFFFFF', text: '#1F2937' } 
    },
    creative: { 
      main: creativeStyles, 
      common: getCommonStyles('#8B5CF6', '#FAFAFF'), 
      colors: { primary: '#8B5CF6', bg: '#FAFAFF', text: '#1F2937' } 
    },
    minimalist: { 
      main: minimalistStyles, 
      common: getCommonStyles('#000000'), 
      colors: { primary: '#000000', bg: '#FFFFFF', text: '#000000' } 
    },
    tech: { 
      main: techStyles, 
      common: getCommonStyles('#00D9FF', '#0F172A', '#FFFFFF'), 
      colors: { primary: '#00D9FF', bg: '#0F172A', text: '#FFFFFF' } 
    },
    consulting: { 
      main: consultingStyles, 
      common: getCommonStyles('#1E3A8A'), 
      colors: { primary: '#1E3A8A', bg: '#FFFFFF', text: '#1E3A8A' } 
    },
    ecommerce: { 
      main: ecommerceStyles, 
      common: getCommonStyles('#059669'), 
      colors: { primary: '#059669', bg: '#FFFFFF', text: '#1F2937' } 
    },
    medical: { 
      main: medicalStyles, 
      common: getCommonStyles('#2563EB'), 
      colors: { primary: '#2563EB', bg: '#FFFFFF', text: '#1F2937' } 
    },
    legal: { 
      main: legalStyles, 
      common: getCommonStyles('#1E3A8A'), 
      colors: { primary: '#1E3A8A', bg: '#FFFFFF', text: '#1F2937' } 
    },
    fitness: { 
      main: fitnessStyles, 
      common: getCommonStyles('#EA580C'), 
      colors: { primary: '#EA580C', bg: '#FFFFFF', text: '#1F2937' } 
    },
    restaurant: { 
      main: restaurantStyles, 
      common: getCommonStyles('#92400E', '#FEF7F0'), 
      colors: { primary: '#92400E', bg: '#FEF7F0', text: '#1F2937' } 
    },
    realestate: { 
      main: realestateStyles, 
      common: getCommonStyles('#16A34A'), 
      colors: { primary: '#16A34A', bg: '#FFFFFF', text: '#1F2937' } 
    },
    photography: { 
      main: photographyStyles, 
      common: getCommonStyles('#FFFFFF', '#1F2937', '#FFFFFF'), 
      colors: { primary: '#FFFFFF', bg: '#1F2937', text: '#FFFFFF' } 
    },
  };
  
  return styleMap[templateId] || styleMap.professional;
};

// Invoice data interface
export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  from: {
    name: string;
    address: string;
    city: string;
    email: string;
    phone: string;
  };
  to: {
    name: string;
    address: string;
    city: string;
    email: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}

// PDF Document Component
const InvoicePDF: React.FC<{ data: InvoiceData; templateId?: string }> = ({ data, templateId = 'professional' }) => {
  const templateStyles = getTemplateStyles(templateId);
  const styles = { ...templateStyles.main, ...templateStyles.common };
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>FinTools.AI</Text>
            <Text style={styles.companyInfo}>Professional Invoice Generator</Text>
          </View>
          <View style={styles.companyInfo}>
            <Text>{data.from.name}</Text>
            <Text>{data.from.address}</Text>
            <Text>{data.from.city}</Text>
            <Text>{data.from.email}</Text>
            <Text>{data.from.phone}</Text>
          </View>
        </View>

        {/* Invoice Title */}
        <Text style={styles.invoiceTitle}>INVOICE</Text>
        <Text style={styles.invoiceNumber}>#{data.invoiceNumber}</Text>

        {/* Invoice Details */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Bill To:</Text>
            <Text style={styles.value}>{data.to.name}</Text>
            <Text style={styles.value}>{data.to.address}</Text>
            <Text style={styles.value}>{data.to.city}</Text>
            <Text style={styles.value}>{data.to.email}</Text>
          </View>
          <View style={styles.column}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.label}>Invoice Date:</Text>
              <Text style={styles.value}>{data.date}</Text>
              <Text style={styles.label}>Due Date:</Text>
              <Text style={styles.value}>{data.dueDate}</Text>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellHeader}>Description</Text>
            <Text style={styles.tableCellHeader}>Qty</Text>
            <Text style={styles.tableCellHeader}>Rate</Text>
            <Text style={styles.tableCellHeader}>Amount</Text>
          </View>
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>${item.rate.toFixed(2)}</Text>
              <Text style={styles.tableCellRight}>${item.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.total}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>${data.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax:</Text>
            <Text style={styles.totalValue}>${data.tax.toFixed(2)}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>Total:</Text>
            <Text style={styles.grandTotalValue}>${data.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Notes */}
        {data.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.value}>{data.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for your business! Generated with FinTools.AI Invoice Generator
        </Text>
      </Page>
    </Document>
  );
};

// Generate and download PDF
export const generateInvoicePDF = async (data: InvoiceData, filename?: string, templateId?: string) => {
  try {
    const blob = await pdf(<InvoicePDF data={data} templateId={templateId} />).toBlob();
    saveAs(blob, filename || `invoice-${data.invoiceNumber}.pdf`);
    return { success: true };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error: 'Failed to generate PDF' };
  }
};

// Sample invoice data for demo purposes
export const sampleInvoiceData: InvoiceData = {
  invoiceNumber: 'INV-2024-001',
  date: new Date().toLocaleDateString(),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  from: {
    name: 'Your Company Name',
    address: '123 Business Street',
    city: 'Business City, BC 12345',
    email: 'contact@yourcompany.com',
    phone: '+1 (555) 123-4567',
  },
  to: {
    name: 'Client Company',
    address: '456 Client Avenue',
    city: 'Client City, CC 67890',
    email: 'billing@clientcompany.com',
  },
  items: [
    {
      description: 'Web Development Services',
      quantity: 40,
      rate: 75.00,
      amount: 3000.00,
    },
    {
      description: 'Design Consultation',
      quantity: 10,
      rate: 100.00,
      amount: 1000.00,
    },
    {
      description: 'Project Management',
      quantity: 20,
      rate: 50.00,
      amount: 1000.00,
    },
  ],
  subtotal: 5000.00,
  tax: 500.00,
  total: 5500.00,
  notes: 'Payment is due within 30 days. Thank you for your business!',
};