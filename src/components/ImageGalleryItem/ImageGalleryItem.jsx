import s from './ImageGalleryItem.module.scss';

export const ImageGalleryItem = () => {
  return (
    <li className={s.item}>
      <img className={s.image} src="" alt="" />
    </li>
  );
};
