import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setIsLoggedIn, useLazyGetUserQuery } from '@/entities/auth';
import { getRouteMain } from '@/shared/const/router';
import { LocalStorageHelper } from '@/shared/helpers';
import { useAppDispatch } from '@/shared/model';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      dispatch(setIsLoggedIn());
      if (isRememberPassword) {
        LocalStorageHelper.setItem('password', password);
      } else {
        LocalStorageHelper.setItem('password', '');
      }
      navigate(getRouteMain(), { replace: true });
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
