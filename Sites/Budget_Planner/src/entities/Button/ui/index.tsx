import styles from './styles.module.scss';

export const Button: React.FC<ButtonProps> = ({ className, title }): React.JSX.Element => {
    return <button className={`${styles.button} ${className}`}>{title}</button>
}
