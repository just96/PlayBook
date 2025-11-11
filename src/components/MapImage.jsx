export default function MapImage({ map, className = "w-24 h-16 object-cover rounded mx-auto" }) {
  const mapImages = {
    Dust2: "./maps/dust2.png",
    Inferno: "./maps/inferno.png",
    Mirage: "./maps/mirage.png",
    Nuke: "./maps/nuke.png",
    Ancient: "./maps/ancient.png",
    Overpass: "./maps/overpass.png",
    Train: "./maps/train.png",
  };

  return <img src={mapImages[map] || "/maps/default.png"} alt={map} className={className} />;
}
