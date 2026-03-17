import { Button } from '../components/ui/button';
import '../index.css';

const Grid = ({ text }: { text: string }) => {
  return (
    <div>
      <Button>{text}</Button>
    </div>
  );
};

export { Grid };
