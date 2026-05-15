import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const authApi = {
  login: (email, password) =>
    api.get('/users', { params: { email, password } }).then((r) => {
      if (!r.data.length) throw new Error('Invalid credentials')
      return r.data[0]
    }),
}

export const tasksApi = {
  getAll:         ()        => api.get('/tasks').then((r) => r.data),
  create:         (task)    => api.post('/tasks', task).then((r) => r.data),
  update:         (id, task) => api.put(`/tasks/${id}`, task).then((r) => r.data),
  remove:         (id)      => api.delete(`/tasks/${id}`),
}
