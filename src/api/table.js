import fetch from '@/utils/fetch';

export function getList(params) {
  return fetch({
    url: '/table/list',
    method: 'get',
    params
  });
}

 export function getUserList(params) {
  return fetch({
    url: '/user',
    method: 'get',
    params
  });
}

  export function getUserBank(params) {
    return fetch({
      url: '/get_user_bank',
      method: 'get',
      params
    });
  }

  export function getVersion(params) {
    return fetch({
    url: '/version_list',
    method: 'get',
    params
    });
  }

  export function getCreateversion(params) {
    console.log('22222')
    console.log(params)
    console.log('22222')
    return fetch({
      url: '/create_version',
      method: 'post',
      data: params
    });

  }




