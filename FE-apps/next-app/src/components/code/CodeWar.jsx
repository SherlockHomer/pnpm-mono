'use client';
import { useState } from 'react';
import Editor from '@/components/code/Editor';
import getIframeSrc from './codeInIframe.template';

export default function CodeWar({ bgColor, question, code }) {
  const [newCode, setCode] = useState('');
  const onChangeCode = (code) => {
    setCode(code);
  };
  return (
    <div className='flex flex-row min-h-screen'>
      <div className={`w-1/2 ${bgColor} text-xl p-2`}>
        <div className='flex flex-col h-1/2 overflow-y-scroll border-b-4 border-dashed'>
          {question}
        </div>
        <div className='flex flex-col h-1/2 overflow-y-scroll'>
          {/* todo: add proxy prevent window.parent */}
          <iframe
            width='100%'
            height='100%'
            sandbox='allow-scripts'
            srcDoc={getIframeSrc(newCode)}
          ></iframe>
        </div>
      </div>
      <div className='w-1/2 bg-slate-500'>
        <Editor value={code} onChange={onChangeCode} />
      </div>
    </div>
  );
}
