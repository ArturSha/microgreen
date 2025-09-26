import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLazyGetUserQuery } from '@/entities/auth';
import { LocalStorageHelper } from '@/shared/helpers';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import style from './LoginPage.module.css';

interface LoginI {
  password: string;
  username: string;
}

const savedPassword = LocalStorageHelper.getItem<string>('password');

const LoginPage = () => {
  const [getUserTrigger, { isFetching }] = useLazyGetUserQuery();
  const [isRememberPassword, setIsRememberPassword] = useState(!!savedPassword);
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<LoginI>({
    defaultValues: {
      password: savedPassword || '',
    },
  });

  const handleClearBtn = () => {
    resetField('password', {
      defaultValue: '',
    });
    if (isRememberPassword) {
      LocalStorageHelper.setItem('password', '');
    }
  };

  const onSubmit: SubmitHandler<LoginI> = async (data) => {
    const { password } = data;
    try {
      await getUserTrigger(password).unwrap();
      if (isRememberPassword) {
        LocalStorageHelper.setItem('password', password);
      } else {
        LocalStorageHelper.setItem('password', '');
      }
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
        <Checkbox checked={isRememberPassword} onChange={setIsRememberPassword}>
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
