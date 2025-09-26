import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLazyGetUserQuery } from '@/entities/auth';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import style from './LoginPage.module.css';

interface InputI {
  password: string;
  username: string;
}

const LoginPage = () => {
  const [getUserTrigger] = useLazyGetUserQuery();
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<InputI>();

  const handleClearBtn = () => {
    resetField('password', {
      defaultValue: '',
    });
  };

  const onSubmit: SubmitHandler<InputI> = async (data) => {
    const { password } = data;
    try {
      await getUserTrigger(password).unwrap();
    } catch {
      setError('password', {
        type: 'manual',
        message: 'Пароль не верный',
      });
    }
  };
  return (
    <section className={style.loginPage}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин"
          autoComplete="username"
          {...register('username')}
          hidden
        />
        <Input
          type="password"
          placeholder="Введите пароль"
          autoComplete="current-password"
          {...register('password')}
        />
        <div className={style.btnContainer}>
          <Button type="submit">Войти</Button>
          <Button variant="danger" type="button" onClick={handleClearBtn}>
            Очистить
          </Button>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
      </form>
    </section>
  );
};
export default LoginPage;
