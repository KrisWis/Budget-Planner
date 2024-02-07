import styles from './styles.module.scss';
import { ButtonProps } from '../model';

export const Button: React.FC<ButtonProps> = ({ onClick, className, title }): React.JSX.Element => {
    return <button onClick={onClick} className={`${styles.button} ${className}`}>{title}</button>
}
