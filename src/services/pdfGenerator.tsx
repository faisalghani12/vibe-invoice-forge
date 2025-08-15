import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// PDF styles using a professional invoice design
const styles = StyleSheet.create({
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
    color: '#1F2937',
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
    color: '#374151',
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
    color: '#374151',
  },
  tableCellHeader: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tableCellRight: {
    flex: 1,
    fontSize: 10,
    color: '#374151',
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
    color: '#374151',
  },
  totalValue: {
    fontSize: 12,
    color: '#374151',
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTop: 2,
    borderTopColor: '#6366F1',
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6366F1',
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
const InvoicePDF: React.FC<{ data: InvoiceData }> = ({ data }) => (
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

// Generate and download PDF
export const generateInvoicePDF = async (data: InvoiceData, filename?: string) => {
  try {
    const blob = await pdf(<InvoicePDF data={data} />).toBlob();
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