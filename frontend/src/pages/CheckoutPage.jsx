import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Check, Bitcoin, Copy, ExternalLink, Clock } from 'lucide-react';
import { mockProducts } from '../mock';

const CheckoutPage = () => {
  const { productId } = useParams();
  const [step, setStep] = useState(1); // 1: Order Review, 2: Payment, 3: Confirmation
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    acceptTerms: false
  });
  const [paymentInfo, setPaymentInfo] = useState({
    btcAddress: 'bc1pxkf6z5nut9v62cy3ufcvcugj5uqra75nxz589swfh0knxadtdmuqkrt6u3', // Mock BTC address
    amount: 0,
    timeLeft: 30 * 60 // 30 minutes in seconds
  });
  const [copied, setCopied] = useState(false);

  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="dark-full-container py-20">
        <div className="dark-content-container text-center">
          <h1 className="display-large mb-6">Product Not Found</h1>
          <Link to="/products" className="btn-primary">
            View All Products <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    );
  }

  const handleCustomerInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && customerInfo.email && customerInfo.name && customerInfo.acceptTerms) {
      setPaymentInfo(prev => ({ ...prev, amount: product.btcPrice }));
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      {/* Header */}
      <section className="dark-full-container py-12">
        <div className="dark-content-container">
          <div className="flex items-center gap-4 mb-8">
            <Link to={`/product/${productId}`} className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
              <ArrowLeft size={20} />
              Back to Product
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="display-large mb-6">Secure Checkout</h1>
            
            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-12">
              {[
                { num: 1, label: 'Order Details' },
                { num: 2, label: 'Payment' },
                { num: 3, label: 'Confirmation' }
              ].map((stepItem, index) => (
                <React.Fragment key={stepItem.num}>
                  <div className={`flex items-center gap-2 ${
                    step >= stepItem.num ? 'text-brand-primary' : 'text-text-muted'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      step >= stepItem.num 
                        ? 'border-brand-primary bg-brand-primary text-black' 
                        : 'border-text-muted'
                    }`}>
                      {step > stepItem.num ? <Check size={16} /> : stepItem.num}
                    </div>
                    <span className="body-medium">{stepItem.label}</span>
                  </div>
                  {index < 2 && (
                    <div className={`flex-1 h-0.5 ${
                      step > stepItem.num ? 'bg-brand-primary' : 'bg-text-muted'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {step === 1 && (
                  <div className="bg-bg-secondary border border-border-subtle p-8">
                    <h2 className="heading-2 mb-6">Customer Information</h2>
                    
                    <form className="space-y-6">
                      <div>
                        <label className="block body-medium text-text-primary mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleCustomerInfoChange}
                          required
                          className="w-full px-4 py-3 bg-bg-primary border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary transition-colors"
                          placeholder="your@email.com"
                        />
                        <p className="body-small text-text-muted mt-1">
                          Download link will be sent to this email
                        </p>
                      </div>
                      
                      <div>
                        <label className="block body-medium text-text-primary mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleCustomerInfoChange}
                          required
                          className="w-full px-4 py-3 bg-bg-primary border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div className="border-t border-border-subtle pt-6">
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={customerInfo.acceptTerms}
                            onChange={handleCustomerInfoChange}
                            className="mt-1 w-4 h-4 text-brand-primary border-border-subtle focus:ring-brand-primary"
                          />
                          <span className="body-small text-text-secondary">
                            I agree to the <a href="#" className="text-brand-primary hover:underline">Terms of Service</a> and 
                            <a href="#" className="text-brand-primary hover:underline"> Privacy Policy</a>. 
                            I understand that SQR400 is for security testing and educational purposes only.
                          </span>
                        </label>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!customerInfo.email || !customerInfo.name || !customerInfo.acceptTerms}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Payment
                      </button>
                    </form>
                  </div>
                )}

                {step === 2 && (
                  <div className="bg-bg-secondary border border-border-subtle p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Bitcoin className="text-brand-primary" size={24} />
                      <h2 className="heading-2">Bitcoin Payment</h2>
                    </div>
                    
                    <div className="mb-6 p-4 bg-brand-hover border border-brand-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="text-brand-primary" size={16} />
                        <span className="body-medium text-brand-primary">
                          Payment expires in: {formatTime(paymentInfo.timeLeft)}
                        </span>
                      </div>
                      <p className="body-small text-text-secondary">
                        Please complete your payment within the time limit to secure your purchase.
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block body-medium text-text-primary mb-2">
                          Send exactly this amount:
                        </label>
                        <div className="flex items-center gap-3 p-4 bg-bg-primary border border-border-subtle">
                          <span className="heading-2 text-brand-primary">₿{paymentInfo.amount}</span>
                          <button
                            onClick={() => copyToClipboard(paymentInfo.amount.toString())}
                            className="btn-secondary px-3 py-1 text-sm"
                          >
                            {copied ? 'Copied!' : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block body-medium text-text-primary mb-2">
                          To this Bitcoin address:
                        </label>
                        <div className="p-4 bg-bg-primary border border-border-subtle">
                          <div className="flex items-center gap-3 mb-3">
                            <code className="text-brand-primary body-small break-all">
                              {paymentInfo.btcAddress}
                            </code>
                            <button
                              onClick={() => copyToClipboard(paymentInfo.btcAddress)}
                              className="btn-secondary px-3 py-1 text-sm flex-shrink-0"
                            >
                              {copied ? 'Copied!' : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-border-subtle pt-6">
                        <h3 className="heading-3 mb-3">Payment Instructions</h3>
                        <ol className="space-y-2 body-small text-text-secondary">
                          <li>1. Copy the exact Bitcoin amount above</li>
                          <li>2. Copy the Bitcoin address</li>
                          <li>3. Send the payment from your Bitcoin wallet</li>
                          <li>4. Wait for blockchain confirmation (usually 10-30 minutes)</li>
                          <li>5. Download link will be sent to your email automatically</li>
                        </ol>
                      </div>
                      
                      <div className="flex gap-4">
                        <button
                          onClick={() => setStep(1)}
                          className="btn-secondary flex-1"
                        >
                          Back to Details
                        </button>
                        <button
                          onClick={handleNextStep}
                          className="btn-primary flex-1"
                        >
                          I've Sent Payment
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="bg-bg-secondary border border-border-subtle p-8 text-center">
                    <div className="w-16 h-16 bg-brand-hover border border-brand-primary/20 flex items-center justify-center mx-auto mb-6">
                      <Check className="text-brand-primary" size={32} />
                    </div>
                    
                    <h2 className="heading-2 mb-4">Payment Submitted!</h2>
                    <p className="body-large text-text-secondary mb-8">
                      Thank you for your purchase. We're processing your Bitcoin payment and will send 
                      your download link to <strong>{customerInfo.email}</strong> once confirmed.
                    </p>
                    
                    <div className="bg-bg-primary border border-border-subtle p-6 mb-8">
                      <h3 className="heading-3 mb-4">What happens next?</h3>
                      <div className="space-y-3 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-brand-primary text-black rounded-full flex items-center justify-center text-sm font-bold">1</div>
                          <span className="body-small text-text-secondary">Payment confirmation (10-30 minutes)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-brand-primary text-black rounded-full flex items-center justify-center text-sm font-bold">2</div>
                          <span className="body-small text-text-secondary">Download link sent to your email</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-brand-primary text-black rounded-full flex items-center justify-center text-sm font-bold">3</div>
                          <span className="body-small text-text-secondary">Contact support@sqr400flashfund.com for help</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/" className="btn-secondary">
                        Return Home
                      </Link>
                      <Link to="/contact" className="btn-primary">
                        Contact Support
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-bg-secondary border border-border-subtle p-6 sticky top-24">
                  <h3 className="heading-3 mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-brand-hover border border-brand-primary/20 flex items-center justify-center">
                        <span className="text-brand-primary font-bold">S</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="body-medium font-medium text-text-primary">{product.name}</h4>
                        <p className="body-small text-text-muted">{product.badge}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-border-subtle pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="body-medium text-text-muted">Subtotal</span>
                      <span className="body-medium text-text-primary">${product.price}</span>
                    </div>
                    {product.originalPrice > product.price && (
                      <div className="flex justify-between">
                        <span className="body-small text-text-muted">Discount</span>
                        <span className="body-small text-brand-primary">-${product.originalPrice - product.price}</span>
                      </div>
                    )}
                    <div className="border-t border-border-subtle pt-3">
                      <div className="flex justify-between">
                        <span className="heading-3">Total (USD)</span>
                        <span className="heading-3 text-brand-primary">${product.price}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="body-medium text-text-muted">Bitcoin Amount</span>
                        <span className="body-medium text-brand-primary">₿{product.btcPrice}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-bg-primary border border-border-subtle">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="text-brand-primary" size={16} />
                      <span className="body-small font-medium text-text-primary">Secure Purchase</span>
                    </div>
                    <ul className="space-y-1 body-small text-text-muted">
                      <li>• Instant download after payment</li>
                      <li>• 30-day money back guarantee</li>
                      <li>• Lifetime updates included</li>
                      <li>• Professional support included</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;