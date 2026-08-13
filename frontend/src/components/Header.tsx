// frontend/src/components/Header.tsx
import React from 'react';
import { useI18n } from '../i18n/I18nContext';
// اگر عکس وجود ندارد، این خط را کامنت نگه دارید تا صفحه سفید نشود
// import myLogo from '../assets/my-logo.png';

const Header: React.FC = () => {
  const { t } = useI18n();

  return (
    <header className="main-header">
      {/* اگر لوگو ندارید، متن چندزبانه نمایش داده می‌شود */}
      <div className="logo-placeholder">
        {t('brandName')}
      </div>

      {/* اگر بعداً لوگو اضافه کردی، این را فعال کن */}
      {/* <img src={myLogo} alt={t('brandName')} width="100" /> */}
    </header>
  );
};

export default Header;
