import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './App.module.scss';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';

export class App extends Component {
  state = {
    searchQuery: null,
    modalInfo: null,
    showModal: false,
  };

  handleSubmitForm = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  handleTogleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleOpenModal = modalInfo => {
    this.setState({ modalInfo });
    this.handleTogleModal();
  };

  render() {
    return (
      <div className={s.appContainer}>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery
          searchQuery={this.state.searchQuery}
          onClick={this.handleOpenModal}
        />
        {/* <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
        <Button /> */}
        {this.state.showModal && (
          <Modal info={this.state.modalInfo} onClick={this.handleTogleModal} />
        )}
        <ToastContainer autoClose={4000} />
      </div>
    );
  }
}
