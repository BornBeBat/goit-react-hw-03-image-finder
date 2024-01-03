import s from './App.module.scss';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Audio } from 'react-loader-spinner';

export const App = () => {
  return (
    <div className={s.appContainer}>
      <Searchbar />
      <ImageGallery />
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
      <Button />
    </div>
  );
};
