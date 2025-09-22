'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@/components/ui';
import { authService, RegisterCredentials } from '@/lib/auth/authService';
import { useAuth } from '@/lib/auth/authContext';
import styles from './Register.module.scss';
import {useRouter} from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterCredentials>({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState<Partial<RegisterCredentials>>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterCredentials]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<RegisterCredentials> = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (!formData.name) {
      newErrors.name = 'Имя обязательно';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authService.register(formData);
      login(response.token, response.user);
      router.push('/');
    } catch (error: any) {
      setErrors({ email: error?.response?.data?.message || 'Ошибка регистрации' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Регистрация</h1>

        <form onSubmit={handleSubmit} className={styles.formFields}>
          <Input
            label="Имя"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Введите ваше имя"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Введите email"
          />

          <Input
            label="Пароль"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Введите пароль"
          />

          <Button
            type="submit"
            loading={isLoading}
            variant="primary"
            size="big"
            className={styles.submitButton}
          >
            Зарегистрироваться
          </Button>
        </form>

        <div className={styles.divider}>или</div>

        <div className={styles.oauthButtons}>
          <Button
            variant="secondary"
            onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}
          >
            Google
          </Button>
        </div>

        <div className={styles.linkToLogin}>
          <span>Уже есть аккаунт? </span>
          <Link href="/login" className={styles.link}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}