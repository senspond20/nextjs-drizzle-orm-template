import { render, screen } from '@testing-library/react';
import TestPage from '../src/app/TestPage';

test('TestPage가 올바르게 렌더링된다', () => {
    render(<TestPage />);
    const heading = screen.getByText(/테스트 페이지/i);
    const paragraph = screen.getByText(/이 페이지는 Jest 테스트를 위한 페이지입니다./i);
    
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
}); 