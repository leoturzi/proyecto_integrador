const toThousand = (n) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default toThousand;