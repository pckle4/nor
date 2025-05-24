
import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Download, QrCode, Palette, Settings, Wifi, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QRCodeGenerator = () => {
  const [qrType, setQrType] = useState('text');
  const [text, setText] = useState('https://lovable.dev');
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiSecurity, setWifiSecurity] = useState('WPA');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [size, setSize] = useState([400]);
  const [errorLevel, setErrorLevel] = useState('M');
  const [format, setFormat] = useState('png');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQRData = () => {
    switch (qrType) {
      case 'wifi':
        return `WIFI:T:${wifiSecurity};S:${wifiSSID};P:${wifiPassword};;`;
      case 'phone':
        return `tel:${phoneNumber}`;
      case 'email':
        return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'text':
      default:
        return text;
    }
  };

  const generateQRCode = async () => {
    const qrData = generateQRData();
    
    if (!qrData.trim()) {
      toast({
        title: "Error",
        description: "Please fill in the required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const options = {
        errorCorrectionLevel: errorLevel as 'L' | 'M' | 'Q' | 'H',
        type: 'image/png' as const,
        quality: 0.92,
        margin: 1,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        width: size[0],
      };

      const qrDataUrl = await QRCode.toDataURL(qrData, options);
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) {
      toast({
        title: "Error",
        description: "Please generate a QR code first",
        variant: "destructive",
      });
      return;
    }

    const link = document.createElement('a');
    link.download = `qrcode.${format}`;
    link.href = qrCodeUrl;
    link.click();

    toast({
      title: "Success",
      description: "QR code downloaded successfully!",
    });
  };

  useEffect(() => {
    generateQRCode();
  }, [qrType, text, wifiSSID, wifiPassword, wifiSecurity, phoneNumber, emailAddress, emailSubject, emailBody, foregroundColor, backgroundColor, size, errorLevel]);

  const colorPresets = [
    { name: 'Classic', fg: '#000000', bg: '#ffffff' },
    { name: 'Ocean', fg: '#1e40af', bg: '#dbeafe' },
    { name: 'Forest', fg: '#166534', bg: '#dcfce7' },
    { name: 'Sunset', fg: '#dc2626', bg: '#fef2f2' },
    { name: 'Purple', fg: '#7c3aed', bg: '#f3e8ff' },
    { name: 'Dark', fg: '#ffffff', bg: '#1f2937' },
  ];

  const renderQRTypeFields = () => {
    switch (qrType) {
      case 'wifi':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wifi-ssid" className="text-sm font-medium flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                WiFi Network Name (SSID)
              </Label>
              <Input
                id="wifi-ssid"
                value={wifiSSID}
                onChange={(e) => setWifiSSID(e.target.value)}
                placeholder="Enter WiFi network name..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-password" className="text-sm font-medium">WiFi Password</Label>
              <Input
                id="wifi-password"
                type="password"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="Enter WiFi password..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Security Type</Label>
              <Select value={wifiSecurity} onValueChange={setWifiSecurity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 'phone':
        return (
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number..."
            />
          </div>
        );
      case 'email':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Enter email address..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-subject" className="text-sm font-medium">Subject (Optional)</Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter email subject..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-body" className="text-sm font-medium">Message (Optional)</Label>
              <Input
                id="email-body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Enter email message..."
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="text" className="text-sm font-medium">
              Text or URL
            </Label>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL..."
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <QrCode className="w-12 h-12 text-indigo-600" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            QR Code Generator
          </h2>
        </div>
        <p className="text-gray-600 text-lg">Create beautiful, customizable QR codes in seconds</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls Panel */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Customization Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Type Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">QR Code Type</Label>
              <Select value={qrType} onValueChange={setQrType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text/URL</SelectItem>
                  <SelectItem value="wifi">WiFi Network</SelectItem>
                  <SelectItem value="phone">Phone Number</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic Fields Based on QR Type */}
            {renderQRTypeFields()}

            {/* Color Presets */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Color Presets
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setForegroundColor(preset.fg);
                      setBackgroundColor(preset.bg);
                    }}
                    className="h-auto p-3 flex flex-col items-center gap-1 hover:scale-105 transition-transform"
                  >
                    <div
                      className="w-8 h-8 rounded border-2 border-gray-200"
                      style={{
                        background: `linear-gradient(45deg, ${preset.bg} 50%, ${preset.fg} 50%)`,
                      }}
                    />
                    <span className="text-xs">{preset.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foreground" className="text-sm font-medium">
                  Foreground Color
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="foreground"
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-16 h-10 p-1 border rounded cursor-pointer"
                  />
                  <Input
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="background" className="text-sm font-medium">
                  Background Color
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="background"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-16 h-10 p-1 border rounded cursor-pointer"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Size Slider */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Size: {size[0]}px
              </Label>
              <Slider
                value={size}
                onValueChange={setSize}
                max={800}
                min={200}
                step={50}
                className="w-full"
              />
            </div>

            {/* Error Correction Level */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Error Correction Level</Label>
              <Select value={errorLevel} onValueChange={setErrorLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">Quartile (25%)</SelectItem>
                  <SelectItem value="H">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Download Format */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Download Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Preview */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="relative">
              {qrCodeUrl ? (
                <div className="relative group">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
                  style={{ width: size[0], height: size[0] }}
                >
                  <QrCode className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex gap-3 w-full">
              <Button
                onClick={generateQRCode}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </Button>
              <Button
                onClick={downloadQRCode}
                variant="outline"
                className="flex-1 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
