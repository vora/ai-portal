import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from '../ant';
import { useAppEnv } from './../env';

let getRequestFunc = () => {
  function getError(option, xhr) {
    const msg = `cannot ${option.method} ${option.action} ${xhr.status}'`;
    const err = new Error(msg);
    err.status = xhr.status;
    err.method = option.method;
    err.url = option.action;
    return err;
  }
  function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
      return text;
    }
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }
  function upload(option) {
    const xhr = new XMLHttpRequest();
    if (option.onProgress && xhr.upload) {
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = (e.loaded / e.total) * 100;
        }
        option.onProgress(e);
      };
    }
    xhr.onerror = function error(e) {
      option.onError(e);
    };
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError(getError(option, xhr), getBody(xhr));
      }
      return option.onSuccess(getBody(xhr), xhr);
    };
    xhr.open(option.method, option.action, true);
    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    }
    const headers = option.headers || {};
    if (headers['X-Requested-With'] !== null) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    Object.keys(headers).forEach((h) => {
      if (headers[h] !== null) {
        xhr.setRequestHeader(h, headers[h]);
      }
    });
    xhr.send(option.file);
    return {
      abort() {
        xhr.abort();
      },
    };
  }
  return upload;
};

function FileUpload({ files, setFiles }) {
  let { api } = useAppEnv();
  return (
    <Upload
      defaultFileList={files
        .filter((file) => !file.justUploaded)
        .map((file) => ({
          uid: file._id,
          name: file.name,
          url: file.url,
          status: 'done',
        }))}
      onChange={({ fileList }) => {
        if (!fileList) return;
        let uploadedFiles = fileList.filter((file) => file.status === 'done');
        let newFiles = uploadedFiles.map((uf) => {
          if (uf.justUploaded) {
            return { name: uf.name, awsStoragePath: uf.awsStoragePath };
          } else {
            return files.find((fl) => fl._id === uf.uid);
          }
        });
        setFiles(newFiles);
      }}
      action={async (file) => {
        let { url, path } = await api.post('/api/files/signUpload', {
          name: file.name,
          type: file.type,
        });
        file.awsStoragePath = path;
        file.justUploaded = true;
        return url;
      }}
      method={'PUT'}
      customRequest={(uploadProps) => {
        console.log(uploadProps);
        return getRequestFunc()(uploadProps);
      }}
    >
      <Button icon={<UploadOutlined />}>Upload Files</Button>
    </Upload>
  );
}

export default FileUpload;
