"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Fingerprint, LockKeyhole, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";

const steps = ["Consent", "Age check", "Complete"];

export default function VerifyPage() {
  const [step, setStep] = useState(0);
  return (
    <main className="verify-page">
      <div className="verify-top"><Link href="/" className="verify-back"><ArrowLeft size={16} />Back to Velora</Link><span className="secure-label"><LockKeyhole size={13} />Secure verification</span></div>
      <section className="verify-layout">
        <div className="verify-context">
          <span className="verify-symbol"><Fingerprint size={26} /></span>
          <p className="eyebrow">Trust, by design</p>
          <h1>Prove your age.<br />Keep your identity private.</h1>
          <p>Our verification partner checks that you’re 18 or older. Velora receives only the result—never your document, selfie, or biometric data.</p>
          <div className="privacy-points"><span><ShieldCheck size={17} /><span><strong>No ID stored by Velora</strong><small>Verification data stays with the certified provider.</small></span></span><span><Smartphone size={17} /><span><strong>Usually under 60 seconds</strong><small>Use a phone camera and an accepted document.</small></span></span></div>
        </div>
        <div className="verify-panel">
          <div className="stepper">{steps.map((label, index) => <div className={index <= step ? "complete" : ""} key={label}><span>{index < step ? <Check size={12} /> : index + 1}</span><small>{label}</small></div>)}</div>
          {step === 0 && <div className="verify-step"><p className="eyebrow">Before you begin</p><h2>Your private age check</h2><p>By continuing, you consent to an age assurance check by our certified verification partner. Their privacy notice opens before any capture begins.</p><label className="consent-row"><input type="checkbox" defaultChecked /><span>I understand how my data is handled and confirm I am checking my own identity.</span></label><button className="button button-primary button-wide" onClick={() => setStep(1)}>Continue securely <ArrowRight size={15} /></button></div>}
          {step === 1 && <div className="verify-step"><p className="eyebrow">Demo provider handoff</p><h2>Continue on your phone</h2><div className="qr-placeholder"><span /><span /><span /><span /><strong>VL</strong></div><p className="centered">Scan this code with your phone or continue in this browser. In production, this opens the vendor-hosted flow.</p><button className="button button-primary button-wide" onClick={() => setStep(2)}>Simulate verified result <ArrowRight size={15} /></button><button className="text-button" onClick={() => setStep(0)}>Go back</button></div>}
          {step === 2 && <div className="verify-step complete-step"><span className="complete-badge"><Check size={28} /></span><p className="eyebrow">All set</p><h2>Age check complete.</h2><p>Velora stored a signed verification reference, the assurance method, and timestamp—nothing else.</p><Link className="button button-dark button-wide" href="/">Return to your feed <ArrowRight size={15} /></Link></div>}
          <div className="provider-note"><ShieldCheck size={14} /><span>Demo integration boundary · no identity data is collected</span></div>
        </div>
      </section>
    </main>
  );
}
