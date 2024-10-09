'use client';

import styles from './Filter.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    page: '',
    name: searchParams.get('name') || '',
    status: searchParams.get('status') || '',
    gender: searchParams.get('gender') || '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (formData.name.trim()) params.append('name', formData.name.trim());
    if (formData.status) params.append('status', formData.status);
    if (formData.gender) params.append('gender', formData.gender);

    router.push(`/characters?${params.toString()}`);
  };

  useEffect(() => {
    if (!searchParams.toString()) {
      setFormData({
        page: '',
        name: '',
        status: '',
        gender: '',
      });
    }
  }, [searchParams]);

  return (
    <form onSubmit={handleSubmit} className={styles.filter}>
      <input
        onChange={handleInputChange}
        value={formData.name}
        className={styles.filter__search}
        name="name"
        type="text"
        placeholder={'Type name here'}
      />

      <select
        onChange={handleInputChange}
        value={formData.status}
        className={styles.filter__select}
        name="status"
        id="status-select"
      >
        <option value="">Choose status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        onChange={handleInputChange}
        value={formData.gender}
        className={styles.filter__select}
        name="gender"
        id="gender-select"
      >
        <option value="">Choose gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">unknown</option>
      </select>

      <button className={styles.filter__btn}>Apply</button>
    </form>
  );
};
