import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReceiptScannerForm } from "@/components/ReceiptScannerForm";

/**
 * Receipt Scanner page - AI-powered receipt text extraction and data parsing
 * Features OCR, expense categorization, and data export capabilities
 */
const ReceiptScanner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-12 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Receipt Scanner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload receipt images and extract data automatically using AI-powered OCR. 
            Digitize your receipts, categorize expenses, and export to CSV or Excel.
          </p>
        </div>

        {/* Scanner Component */}
        <div className="max-w-4xl mx-auto">
          <ReceiptScannerForm />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white text-xl">🔍</span>
            </div>
            <h3 className="font-semibold text-foreground">AI Text Extraction</h3>
            <p className="text-sm text-muted-foreground">
              Advanced OCR technology extracts all text from receipt images with high accuracy
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white text-xl">📊</span>
            </div>
            <h3 className="font-semibold text-foreground">Smart Categorization</h3>
            <p className="text-sm text-muted-foreground">
              Automatically categorize expenses and extract key information like totals and dates
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary-gradient rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white text-xl">💾</span>
            </div>
            <h3 className="font-semibold text-foreground">Easy Export</h3>
            <p className="text-sm text-muted-foreground">
              Export processed data to CSV, Excel, or integrate with your accounting software
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReceiptScanner;