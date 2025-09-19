import { useForm, type SubmitHandler } from 'react-hook-form';
import style from './LoginPage.module.css';

interface InputI {
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    resetField,
    formState: { errors },
  } = useForm<InputI>();

  const handleClearBtn = () => {
    resetField('password', {
      defaultValue: '',
    });
  };

  const onSubmit: SubmitHandler<InputI> = (data) => {
    if (data.password === import.meta.env.VITE_PASSWORD) {
      console.log('success');
      clearErrors('password');
    } else {
      setError('password', {
        type: 'manual',
        message: 'Пароль не верный',
      });
    }
  };
  return (
    <section className={style.loginPage}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="password" placeholder="Введите пароль" {...register('password')} />
        <div>
          <button type="submit">Войти</button>
          <button type="button" onClick={handleClearBtn}>
            Очистить
          </button>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
      </form>
    </section>
  );
};
export default LoginPage;
