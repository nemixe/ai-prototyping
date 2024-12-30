{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_20
    (pkgs.nodePackages.pnpm.overrideAttrs (oldAttrs: {
      version = "8.14.1";
      src = pkgs.fetchurl {
        url = "https://registry.npmjs.org/pnpm/-/pnpm-8.14.1.tgz";
        sha256 = "sha256-LfeOZdQz12k7nT+9r0MbLZa7T5ai/+zVGlDv4W5Qpqg=";
      };
      installPhase = ''
        mkdir -p $out
        npm_config_cache=${TMPDIR:-/tmp}/.npm-cache npm install -g --prefix $out "$src"
      '';
    }))
  ];

  NPM_CONFIG_CACHE = "${TMPDIR:-/tmp}/.npm-cache";
  NPM_CONFIG_LOGLEVEL = "warn";

  shellHook = ''
    echo "Node.js version: $(node -v)"
    echo "PNPM version: $(pnpm -v)"
  '';
}
