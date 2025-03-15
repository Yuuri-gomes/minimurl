export default function Benefits() {
  const socialMedias = [
    { name: "Instagram" },
    { name: "Facebook" },
    { name: "YouTube" },
    { name: "Twitter" },
    { name: "LinkedIn" },
    { name: "Pinterest" },
    { name: "WhatsApp" },
    { name: "TikTok" },
  ].map((socialMedia) => ({ id: crypto.randomUUID(), ...socialMedia }));

  const benefits = [
    {
      title: "🔗 Links mais curtos e bonitos",
      description:
        "Facilite o compartilhamento e aumente a taxa de cliques com URLs amigáveis.",
    },
    {
      title: "📈 Encurte, compartilhe e monitore",
      description:
        "Use seus links encurtados em publicações, blogs e mensagens. Acompanhe o número de acessos com nosso contador de cliques.",
    },
    {
      title: "🚀 SEO e visibilidade",
      description:
        "URLs otimizadas ajudam no ranqueamento e aumentam a confiança do usuário.",
    },
    {
      title: "📱 Totalmente responsivo",
      description:
        "Use em qualquer dispositivo! Funciona perfeitamente no celular, tablet ou desktop.",
    },
    {
      title: "🔒 Seguro e confiável",
      description:
        "Nossos links são protegidos contra fraudes e verificados para garantir segurança.",
    },
    {
      title: "💰 100% gratuito",
      description:
        "Encurte quantos links quiser sem pagar nada! Plataforma acessível para todos.",
    },
  ].map((benefit) => ({ id: crypto.randomUUID(), ...benefit }));

  return (
    <section className="bg-gray-900 text-white py-12 px-6 text-center mt-10 rounded-lg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Um Encurtador de URL simples e rápido!
        </h2>
        <p className="text-lg mb-6">
          O <strong>Minimurl</strong> é a solução ideal para encurtar links do{" "}
          {socialMedias.map((socialMedia, index) => (
            <a
              key={socialMedia.id}
              href={`https://${socialMedia.name.toLowerCase()}.com`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>{socialMedia.name}</strong>
              {index < socialMedias.length - 1 ? ", " : " "}
            </a>
          ))}
          e qualquer outro site. Basta colar a URL longa e clicar no botão para
          encurtar. Depois, compartilhe sua URL encurtada em sites, chats e
          emails. Além disso, você pode <strong>monitorar os acessos</strong> e
          acompanhar o desempenho dos seus links!
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="text-gray-300 mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
