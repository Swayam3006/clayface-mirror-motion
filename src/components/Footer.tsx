
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="text-black font-bold text-xl">clayface</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-sm">
              Decision Intelligence Platform for CPG Brand Managers. From insight to impact in minutes, not months.
            </p>
          </div>
          
          <div>
            <h4 className="text-black font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Smart Alerts</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Report Auto-Gen</a></li>
              <li><a href="#" className="hover:text-black transition-colors">What-If Simulators</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Market Diagnostics</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-black font-semibold mb-4">Solutions</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Brand Management</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Market Intelligence</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Competitive Analysis</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Performance Tracking</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-black font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-black transition-colors">CPG Insights</a></li>
              <li><a href="#" className="hover:text-black transition-colors">API</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">&copy; 2024 clayface. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-black transition-colors">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">Terms</a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
