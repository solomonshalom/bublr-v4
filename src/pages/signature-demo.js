/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import SignaturePad from '../components/signature-pad'

const demoStyles = css`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #f8f9fa;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
  }

  .demo-container {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }

  .demo-title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
  }

  .demo-subtitle {
    font-size: 1rem;
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .signature-info {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
  }

  .signature-data {
    font-family: monospace;
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    margin-top: 1rem;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 200px;
    overflow-y: auto;
    text-align: left;
  }

  .status {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    margin-top: 1rem;
    
    &.signed {
      background: #d4edda;
      color: #155724;
    }
    
    &.cleared {
      background: #f8d7da;
      color: #721c24;
    }
  }
`

export default function SignatureDemo() {
  const [signatureData, setSignatureData] = useState(null)
  const [status, setStatus] = useState('waiting')

  const handleSignatureComplete = (data) => {
    setSignatureData(data)
    setStatus('signed')
  }

  const handleSignatureCleared = () => {
    setSignatureData(null)
    setStatus('cleared')
  }

  return (
    <div css={demoStyles}>
      <div className="demo-container">
        <h1 className="demo-title">Signature Pad Component</h1>
        <p className="demo-subtitle">
          This is a React component recreated from the original HTML, CSS, and JavaScript. 
          The floating button can be dragged around and clicked to open a signature pad.
        </p>
        
        {signatureData && (
          <div className="signature-info">
            <h3>Signature Data</h3>
            <div className={`status ${status}`}>
              Status: {status === 'signed' ? 'Document Signed ✓' : 'Signature Cleared'}
            </div>
            {signatureData && (
              <div className="signature-data">
                {JSON.stringify(signatureData, null, 2)}
              </div>
            )}
          </div>
        )}
      </div>

      <SignaturePad 
        onSignatureComplete={handleSignatureComplete}
        onSignatureCleared={handleSignatureCleared}
      />
    </div>
  )
}