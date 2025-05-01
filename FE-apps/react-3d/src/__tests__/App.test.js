import { render, screen } from '@testing-library/react';
import App from '../App';

// 模拟logo.svg文件，因为它在App.js中被导入
jest.mock('../logo.svg', () => 'test-image.svg');

// 模拟依赖组件，避免测试复杂的子组件逻辑
jest.mock('../component/fpsPanel', () => {
  return function MockFpsPanel() {
    return <div data-testid='mock-fps-panel'>FPS Panel</div>;
  };
});

jest.mock('../component/animation/earthAndMoon', () => {
  return function MockEarthAndMoon() {
    return <div data-testid='mock-earth-moon'>Earth and Moon</div>;
  };
});

describe('App Component', () => {
  test('renders header with logo', async () => {
    render(<App />);

    // 使用 screen 方法而不是直接查询 document
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    // 检查 logo 是否存在（使用 alt 属性查找图片）
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass('App-logo');
  });

  test('renders main section with child components', async () => {
    render(<App />);

    // 使用 screen.getByRole 获取主要内容区域
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();

    // 检查模拟的子组件是否被渲染
    const fpsPanel = screen.getByTestId('mock-fps-panel');
    const earthMoon = screen.getByTestId('mock-earth-moon');

    expect(fpsPanel).toBeInTheDocument();
    expect(earthMoon).toBeInTheDocument();
  });

  test('has correct component structure', async () => {
    const { container } = render(<App />);

    // 检查整体结构
    const appDiv = container.querySelector('.App');
    expect(appDiv).toBeInTheDocument();

    // 检查子元素结构是否正确
    expect(appDiv.children[0]).toHaveClass('header');
    expect(appDiv.children[1]).toHaveAttribute('role', 'main');
  });
});
