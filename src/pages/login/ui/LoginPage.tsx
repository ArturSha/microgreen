import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLazyGetUserQuery } from '@/entities/auth';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import style from './LoginPage.module.css';

interface LoginI {
  password: string;
  username: string;
}

const LoginPage = () => {
  const [getUserTrigger, { isFetching }] = useLazyGetUserQuery();
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<LoginI>();

  const handleClearBtn = () => {
    resetField('password', {
      defaultValue: '',
    });
  };

  console.log(isChecked);

  const onSubmit: SubmitHandler<LoginI> = async (data) => {
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
      <Text as="h1">Войти</Text>
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
          error={errors.password && errors.password.message}
        />
        <Checkbox checked={isChecked} onChange={setIsChecked}>
          Сохранить пароль
        </Checkbox>
        <div className={style.btnContainer}>
          <Button disabled={isFetching} isLoading={isFetching} type="submit">
            Войти
          </Button>
          <Button variant="danger" type="button" onClick={handleClearBtn}>
            Очистить
          </Button>
        </div>
      </form>
    </section>
  );
};
export default LoginPage;
