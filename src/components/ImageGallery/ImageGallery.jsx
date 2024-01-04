import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Audio } from 'react-loader-spinner';

import s from './ImageGallery.module.scss';
import API from 'servises/pixAPI';
import { Button } from 'components/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { status } from 'tools';

export class ImageGallery extends Component {
  state = {
    response: [],
    status: 'init',
    page: 1,
  };

  async componentDidUpdate(prevProp, prevState) {
    const { props } = this;

    if (prevProp.searchQuery !== props.searchQuery) {
      this.setState({ status: status.PENDING });
      try {
        const data = await API.getPhotosAxios(props.searchQuery);
        this.setState({
          response: data.hits,
          status: status.RESPONSE,
          page: 1,
        });
        this.notification(data);
      } catch (error) {
        toast.error(error.message);
        this.setState({ status: status.REJECT });
      }
    }

    if (this.state.page !== prevState.page && this.state.page > 1) {
      this.setState({ status: status.PENDING });
      try {
        const data = await API.getPhotosAxios(
          this.props.searchQuery,
          this.state.page
        );
        this.setState(prevState => ({
          response: [...prevState.response, ...data.hits],
          status: status.RESPONSE,
        }));
        this.notification(data);
      } catch (error) {
        toast.error(error.message);
        this.setState({ status: status.REJECT });
      }
    }
  }

  notification = ({ totalHits, hits }) => {
    if (totalHits % 12 === hits.length && hits.length !== 0) {
      toast.warn(`We're sorry, but you've reached the end of search results.`);
      this.setState({ status: status.REJECT });
    }
    if (totalHits === 0) {
      toast.warn(`We're sorry, but we can't find anythis by yours request.`);
      this.setState({ status: status.REJECT });
    }
  };

  handleNextPage = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status } = this.state;
    return (
      <>
        <ul className={s.gallery}>
          {this.state.response.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  img={webformatURL}
                  largeImg={largeImageURL}
                  tags={tags}
                  onClick={this.props.onClick}
                />
              );
            }
          )}
        </ul>
        {status !== 'reject' && (
          <div className={s.buttonWrapper}>
            {status === 'response' && <Button onClick={this.handleNextPage} />}
            {status === 'pending' && <Audio />}
          </div>
        )}
      </>
    );
  }
}
