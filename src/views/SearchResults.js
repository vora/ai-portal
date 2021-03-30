import React from 'react';
import { Layout } from '../ant';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import { queryParamsFromProps } from '../util';
import { useAppEnv } from '../env';
import { useHistory } from 'react-router';
import ListAndFilterResources from './../components/ListAndFilterResources';
import ListAndFilterOrganizations from './../components/ListAndFilterOrganizations';

export default function SearchResults(props) {
  let { enums } = useAppEnv();
  let history = useHistory();
  let fileTypes = enums ? enums.FILE_TYPES : [];
  let orgTypes = enums ? enums.ORG_TYPES : [];
  let resourceTypes = enums ? enums.RESOURCE_TYPES : [];
  let resourcePath = enums ? enums.RESOURCE_PATHS : [];
  let { q, ...filterParams } = queryParamsFromProps(props);
  let isResourceView = history.location.pathname.includes('/resources');
  let View = isResourceView
    ? ListAndFilterResources
    : ListAndFilterOrganizations;
  let updateSearch = (query, filters) => {
    let segments = [];
    segments.push('q=' + (query || ''));
    for (let filter in filters) {
      if (filters[filter] && filters[filter].length !== 0) {
        segments.push(filter + '=' + filters[filter]);
      }
    }
    let url =
      (isResourceView ? '/resources?' : '/organizations?') + segments.join('&');
    window.gtag('event', 'search_bar_query', {
      event_label: query,
      event_category: 'search',
    });
    history.push(url);
  };
  return (
    <Layout>
      <NavBar />
      <View
        orgTypes={orgTypes}
        resourceTypes={resourceTypes}
        fileTypes={fileTypes}
        resourcePath={resourcePath}
        location={props.location}
        updateSearch={updateSearch}
        filterVals={filterParams || {}}
        query={q || ''}
      />
      <Footer />
    </Layout>
  );
}
