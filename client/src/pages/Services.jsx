const services = [
  ['User authentication', 'Sign-up, login and logout using JWT tokens sent in request headers.'],
  ['User management', 'Full CRUD for user accounts with validation.'],
  ['Access control', 'Role-based authorization for protected routes.'],
  ['Token security', 'Token expiry and revocation to keep sessions safe.'],
]

export default function Services() {
  return (
    <section className="page">
      <h1>Our services</h1>
      <p>Everything you need to authenticate and manage your users.</p>
      <div className="cards">
        {services.map(([title, text]) => (
          <div className="card" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
