import './MainContent.css';
import LastProductCreated from './LastProductCreated';
import LastUserCreated from './LastUserCreated';
import Panel from './Panel/Panel';

function MainContent(){

    return (
      <>
        <h1 className="main-title">Panel Principal</h1>
        <section className="mc-container">
          <Panel />
        </section>
        <div className='mc-container last-items-wrapper'>
          <LastProductCreated />
          <LastUserCreated />
        </div>
      </>
    );
}

export default MainContent;