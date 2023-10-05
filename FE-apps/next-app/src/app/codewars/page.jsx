'use client';
import ReactFullpage from '@fullpage/react-fullpage';
import CodeWar from '@/components/code/CodeWar';

export default function CodeWarsPage() {
  return (
    <div>
      <ReactFullpage
        licenseKey='YOUR_KEY_HERE'
        scrollingSpeed={1000}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className='section'>
                <div className='flex items-center justify-center text-6xl'>
                  <code>Let&#39;s code it!</code>
                </div>
              </div>
              <div className='section'>
                <div className='flex flex-row min-h-screen'>
                  <div className='w-1/2 bg-sky-300 text-xl p-2'>Try writing reduce</div>
                  <div className='w-1/2 bg-slate-500'>
                    <CodeWar value='alert(1)' />
                  </div>
                </div>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
