// 修改为使用但未导出来解决未使用警告
const unusedVar = 'this is unused';
console.log(`Debug info: ${unusedVar}`);

// 添加break语句解决fallthrough错误并修复返回类型
function testSwitch(value: number): string {
  switch (value) {
    case 1:
      console.log('Value is 1');
      break; // 添加break语句
    case 2:
      return 'Value is 2';
    default:
      return 'Unknown value';
  }
  return 'Unreachable code'; // 添加默认返回，确保所有路径都有返回值
}

// 修复常量二元表达式问题
const badCondition = true;

// 使用逻辑赋值运算符
let x = 5;
x ||= 10; // 替换if (!x) { x = 10 }

// 导出用于测试
export { testSwitch, badCondition, x };
