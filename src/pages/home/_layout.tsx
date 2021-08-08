import HomeBanner from './home-banner';
// import HomeTese from './home-tese';
import HomePhotoList from './home-photo-list';
import HomeCircle from './home-ciecle';
import HomeContest from './home-contest';
import HomeQuestion from './home-question';

const HomePage = () => {
  return (
    <div style={{ background: '#fff' }}>
      <HomeBanner />
      {/* <HomeTese /> */}
      <HomePhotoList />
      <HomeCircle />
      <HomeContest />
      <HomeQuestion />
    </div>
  );
};

export default HomePage;
