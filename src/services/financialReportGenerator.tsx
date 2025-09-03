import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

interface RevenueItem {
  category: string;
  amount: number;
  description: string;
}

interface ExpenseItem {
  category: string;
  amount: number;  
  description: string;
}

interface ReportData {
  companyName: string;
  reportPeriod: string;
  reportType: string;
  revenue: RevenueItem[];
  expenses: ExpenseItem[];
  notes: string;
}

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#3B82F6',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 10,
  },
  companyName: {
    fontSize: 14,
    color: '#475569',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 5,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#F1F5F9',
  },
  tableColHeader: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 0,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    padding: 8,
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 0,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#374151',
  },
  tableCell: {
    fontSize: 10,
    color: '#4B5563',
  },
  summarySection: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#374151',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  netIncomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: 2,
    borderTopColor: '#3B82F6',
    paddingTop: 10,
    marginTop: 10,
  },
  netIncomeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  netIncomeValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  netIncomePositive: {
    color: '#059669',
  },
  netIncomeNegative: {
    color: '#DC2626',
  },
  notes: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FFFBEB',
    borderLeft: 4,
    borderLeftColor: '#F59E0B',
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 10,
    color: '#78350F',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 8,
    borderTop: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  }
});

// PDF Document Component
const FinancialReportPDF = ({ reportData }: { reportData: ReportData }) => {
  const totalRevenue = reportData.revenue.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalExpenses = reportData.expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
  const netIncome = totalRevenue - totalExpenses;

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getReportTypeTitle = (type: string) => {
    const types = {
      'income-statement': 'Income Statement',
      'profit-loss': 'Profit & Loss Report',
      'cash-flow': 'Cash Flow Statement',
      'financial-summary': 'Financial Summary'
    };
    return types[type as keyof typeof types] || 'Financial Report';
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{getReportTypeTitle(reportData.reportType)}</Text>
          <Text style={styles.subtitle}>{reportData.reportPeriod}</Text>
          <Text style={styles.companyName}>{reportData.companyName}</Text>
        </View>

        {/* Revenue Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Sources</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Category</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Amount</Text>
              </View>
            </View>
            {reportData.revenue.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.category}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.description || '-'}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{formatCurrency(item.amount)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Expenses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expenses</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Category</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Description</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Amount</Text>
              </View>
            </View>
            {reportData.expenses.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.category}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.description || '-'}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{formatCurrency(item.amount)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Revenue:</Text>
            <Text style={styles.summaryValue}>{formatCurrency(totalRevenue)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Expenses:</Text>
            <Text style={styles.summaryValue}>{formatCurrency(totalExpenses)}</Text>
          </View>
          <View style={styles.netIncomeRow}>
            <Text style={styles.netIncomeLabel}>Net Income:</Text>
            <Text style={[
              styles.netIncomeValue,
              netIncome >= 0 ? styles.netIncomePositive : styles.netIncomeNegative
            ]}>
              {formatCurrency(netIncome)}
            </Text>
          </View>
        </View>

        {/* Notes Section */}
        {reportData.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesTitle}>Additional Notes</Text>
            <Text style={styles.notesText}>{reportData.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString()} • FinTools.AI Financial Report Generator
        </Text>
      </Page>
    </Document>
  );
};

// Export function to generate and download the report
export const generateFinancialReport = async (reportData: ReportData) => {
  try {
    const doc = <FinancialReportPDF reportData={reportData} />;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();
    
    const fileName = `${reportData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${reportData.reportType}_${reportData.reportPeriod.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    saveAs(blob, fileName);
    
    return { success: true };
  } catch (error) {
    console.error('Error generating financial report:', error);
    throw new Error('Failed to generate financial report');
  }
};