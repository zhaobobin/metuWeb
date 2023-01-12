import PhotoListQuery from '@/blocks/photo/photo-list-query';

export default function PhotoLayout(props) {
  return <PhotoListQuery url="/photos" {...props.queryOption} />;
}
