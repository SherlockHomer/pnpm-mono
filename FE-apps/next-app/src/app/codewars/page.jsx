'use client';
import ReactFullpage from '@fullpage/react-fullpage';
import CodeWar from '@/components/code/CodeWar';

const colors = [
  'bg-violet-300',
  'bg-sky-300',
  'bg-red-300',
  'bg-orange-300',
  'bg-amber-300',
  'bg-lime-300',
  'bg-green-300',
  'bg-emerald-300',
  'bg-teal-300',
  'bg-cyan-300',
];

const questions = ['Try to write reduce', 'Try to write inherit', 'Try to write fib in caching'];

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
                <div className='flex items-center justify-center text-6xl leading-tight min-h-screen'>
                  <code>Let&#39;s code it in fullpage!</code>
                </div>
              </div>
              {questions.map((question, index) => (
                <div className='section' key={index}>
                  <CodeWar
                    question={`No.${index + 1} ${question}`}
                    bgColor={colors[index % colors.length]}
                  ></CodeWar>
                </div>
              ))}
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
