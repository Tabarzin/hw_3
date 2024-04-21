import Text from '../../components/Text';
import styles from './BackButton.module.scss';

const BackButton = () => {
  return (
    <div className={styles.backbtn}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
          stroke="black"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Text className={styles.text} view={'p-20'}>
        Назад
      </Text>
    </div>
  );
};

export default BackButton;
