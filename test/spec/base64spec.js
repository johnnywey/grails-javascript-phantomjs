describe('base64', function() {
    it('should be able to encode', function() {
        var orig = 'http://abc123.com/blah';
        expect(Base64.encode(orig)).toBe('aHR0cDovL2FiYzEyMy5jb20vYmxhaA==')
    });
    it('should be able to decode', function() {
        var orig = 'YWJjMTIz';
        expect(Base64.decode(orig)).toBe('abc123')
    });
});